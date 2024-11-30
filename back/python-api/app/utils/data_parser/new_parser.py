import requests
from bs4 import BeautifulSoup

# URL категории Wildberries, пример
url = "https://www.wildberries.ru/catalog/muzhchinam/odezhda/futbolki-i-mayki"  # Пример URL, замените на нужный

# Функция для получения HTML-контента страницы
def get_page_content(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Ошибка при запросе страницы: {response.status_code}")
        return None

# Функция для парсинга данных с страницы
def parse_products(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    products = []

    # Ищем все карточки товаров на странице
    items = soup.find_all('div', {'class': 'catalog-product-card'})

    for item in items:
        title = item.find('span', {'class': 'goods-name'})
        price = item.find('span', {'class': 'price__lower-price'})
        img_tag = item.find('img', {'class': 'product-card__img'})

        if title and price and img_tag:
            product = {
                'title': title.text.strip(),
                'price': price.text.strip(),
                'image_url': img_tag['src']
            }
            products.append(product)
    
    return products

# Основная функция
def main():
    html_content = get_page_content(url)
    if html_content:
        products = parse_products(html_content)
        for product in products:
            print(f"Название: {product['title']}")
            print(f"Цена: {product['price']}")
            print(f"Изображение: {product['image_url']}")
            print('-' * 40)

if __name__ == '__main__':
    main()
