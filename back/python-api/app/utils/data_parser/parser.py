import datetime
from pprint import pprint
from bs4 import BeautifulSoup
import requests
import json
import pandas as pd
from retry import retry

# pip install openpyxl
# pip install xlsxwriter

"""
Данные которые собирает парсер:
            'id': артикуд,
            'name': название,
            'price': цена,
            'salePriceU': цена со скидкой,
            'cashback': кэшбек за отзыв,
            'sale': % скидки,
            'brand': бренд,
            'rating': рейтинг товара,
            'supplier': продавец,
            'supplierRating': рейтинг продавца,
            'feedbacks': отзывы,
            'reviewRating': рейтинг по отзывам,
            'promoTextCard': промо текст карточки,
            'promoTextCat': промо текст категории
"""


def get_catalogs_wb() -> dict:

    url = 'https://static-basket-01.wbbasket.ru/vol0/data/main-menu-ru-ru-v3.json'
    headers = {'Accept': '*/*', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    response = requests.get(url, headers=headers).json()
    return response


def get_data_category(catalogs_wb: dict) -> list:
    """сбор данных категорий из каталога Wildberries"""
    catalog_data = []
    if isinstance(catalogs_wb, dict) and 'childs' not in catalogs_wb:
        catalog_data.append({
            'name': f"{catalogs_wb['name']}",
            'shard': catalogs_wb.get('shard', None),
            'url': catalogs_wb['url'],
            'query': catalogs_wb.get('query', None)
        })
    elif isinstance(catalogs_wb, dict):
        catalog_data.append({
            'name': f"{catalogs_wb['name']}",
            'shard': catalogs_wb.get('shard', None),
            'url': catalogs_wb['url'],
            'query': catalogs_wb.get('query', None)
        })
        catalog_data.extend(get_data_category(catalogs_wb['childs']))
    else:
        for child in catalogs_wb:
            catalog_data.extend(get_data_category(child))
    return catalog_data


def search_category_in_catalog(url: str, catalog_list: list) -> dict:
    """проверка пользовательской ссылки на наличии в каталоге"""
    for catalog in catalog_list:
        if catalog['url'] == url.split('https://www.wildberries.ru')[-1]:
            print(f'найдено совпадение: {catalog["name"]}')
            return catalog



def get_data_from_json(json_file: dict) -> list:
    """извлекаем из json данные"""
    data_list = []
    
    for data in json_file['data']['products']:
        sku = data.get('id')
        name = data.get('name')
        price = int(data.get("priceU") / 100)
        salePriceU = int(data.get('salePriceU') / 100)
        cashback = data.get('feedbackPoints')
        sale = data.get('sale')
        brand = data.get('brand')
        rating = data.get('rating')
        supplier = data.get('supplier')
        supplierRating = data.get('supplierRating')
        feedbacks = data.get('feedbacks')
        reviewRating = data.get('reviewRating')
        promoTextCard = data.get('promoTextCard')
        promoTextCat = data.get('promoTextCat')
        data_list.append({
            'id': sku,
            'name': name,
            'price': price,
            'salePriceU': salePriceU,
            'cashback': cashback,
            'sale': sale,
            'brand': brand,
            'rating': rating,
            'supplier': supplier,
            'supplierRating': supplierRating,
            'feedbacks': feedbacks,
            'reviewRating': reviewRating,
            'promoTextCard': promoTextCard,
            'promoTextCat': promoTextCat,
            'link': f'https://www.wildberries.ru/catalog/{data.get("id")}/detail.aspx?targetUrl=BP'
        })
        # print(f"SKU:{data['id']} Цена: {int(data['salePriceU'] / 100)} Название: {data['name']} Рейтинг: {data['rating']}")
    return data_list


@retry(Exception, tries=-1, delay=0)
def scrap_page(page: int, shard: str, query: str, low_price: int, top_price: int, discount: int = None) -> dict:
    """Сбор данных со страниц"""
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0)"}
    url = f'https://catalog.wb.ru/catalog/{shard}/catalog?appType=1&curr=rub' \
          f'&dest=-1257786' \
          f'&locale=ru' \
          f'&page={page}' \
          f'&priceU={low_price * 100};{top_price * 100}' \
          f'&sort=popular&spp=0' \
          f'&{query}' \
          f'&discount={discount}'
    r = requests.get(url, headers=headers)
    print(f'Статус: {r.status_code} Страница {page} Идет сбор...')

    return r.json()


def save_excel(data: list, filename: str):
    """сохранение результата в excel файл"""
    df = pd.DataFrame(data)
    df.to_csv("parsing_tshirt.csv", index=False)
    # указываем размеры каждого столбца в итоговом файле
    print(f'Все сохранено в {filename}.csv\n')


def parser(url: str, low_price: int = 1, top_price: int = 1000000, discount: int = 0):
    """основная функция"""
    # получаем данные по заданному каталогу
    catalog_data = get_data_category(get_catalogs_wb())
    try:
        # поиск введенной категории в общем каталоге
        category = search_category_in_catalog(url=url, catalog_list=catalog_data)
        data_list = []
        for page in range(1, 11):  # вб отдает 50 страниц товара (раньше было 100)
            data = scrap_page(
                page=page,
                shard=category['shard'],
                query=category['query'],
                low_price=low_price,
                top_price=top_price,
                discount=discount)
            print(f'Добавлено позиций: {len(get_data_from_json(data))}')
            if len(get_data_from_json(data)) > 0:
                data_list.extend(get_data_from_json(data))
            else:
                break
        print(f'Сбор данных завершен. Собрано: {len(data_list)} товаров.')
        # сохранение найденных данных
        save_excel(data_list, f'{category["name"]}_from_{low_price}_to_{top_price}')
        print(f'Ссылка для проверки: {url}?priceU={low_price * 100};{top_price * 100}&discount={discount}')
    except TypeError:
        print('Ошибка! Возможно не верно указан раздел. Удалите все доп фильтры с ссылки')
    except PermissionError:
        print('Ошибка! Вы забыли закрыть созданный ранее excel файл. Закройте и повторите попытку')


if __name__ == '__main__':
    """данные для теста. собераем товар с раздела велосипеды в ценовой категории от 1тыс, до 100тыс, со скидкой 10%"""
    # url = 'https://www.wildberries.ru/catalog/sport/vidy-sporta/velosport/velosipedy'


    # url = 'https://www.wildberries.ru/catalog/elektronika/planshety'  # сюда вставляем вашу ссылку на категорию
    # low_price = 10000  # нижний порог цены
    # top_price = 15000  # верхний порог цены
    # discount = 0  # скидка в % поиск идут от N-ой скидки и выше
    # start = datetime.datetime.now()  # запишем время старта
    #
    # parser(url=url, low_price=low_price, top_price=top_price, discount=discount)
    #
    # end = datetime.datetime.now()  # запишем время завершения кода
    # total = end - start  # расчитаем время затраченное на выполнение кода
    # print("Затраченное время:" + str(total))

    # """для exe приложения(чтобы сделать exe файл - pip install auto_py_to_exe для установки, для запуска auto-py-to-exe)"""
    while True:
        try:
            url = "https://www.wildberries.ru/catalog/muzhchinam/odezhda/futbolki-i-mayki"
            if url == 'q':
                break
            low_price = 200
            top_price = 20000
            discount = 0
            parser(url=url, low_price=low_price, top_price=top_price, discount=discount)
        except Exception as e:
            print(e)
            print('произошла ошибка данных при вводе, проверте правильность введенных данных,\n'
                  'Перезапуск...')