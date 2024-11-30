from app.utils.data_parser.insert_to_db import insert_to_db
import asyncio
if __name__ == "__main__":
    asyncio.run(insert_to_db("app/utils/data_parser/parsing_phones.csv"))