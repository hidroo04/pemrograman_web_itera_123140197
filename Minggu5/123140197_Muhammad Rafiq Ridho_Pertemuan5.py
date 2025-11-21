from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    @abstractmethod
    def get_info(self):
        pass

    @property
    def title(self):
        return self._title


class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author

    def get_info(self):
        return f"[Book] ID: {self._item_id} | Title: {self._title} | Author: {self.__author}"


class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue):
        super().__init__(item_id, title)
        self.__issue = issue

    def get_info(self):
        return f"[Magazine] ID: {self._item_id} | Title: {self._title} | Issue: {self.__issue}"


class Library:
    def __init__(self):
        self.__items = []

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items.append(item)

    def show_items(self):
        if not self.__items:
            return "No items in library."
        return "\n".join(item.get_info() for item in self.__items)

    def search_item(self, keyword):
        results = []
        for item in self.__items:
            if keyword.lower() in item.title.lower() or keyword == str(item._item_id):
                results.append(item.get_info())
        return "\n".join(results) if results else "Item not found."

library = Library()

while True:
    print("\n===== LIBRARY MENU =====")
    print("1. Tambah Book")
    print("2. Tambah Magazine")
    print("3. Tampilkan Semua Item")
    print("4. Cari Item")
    print("5. Keluar")
    
    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        item_id = input("Masukkan ID: ")
        title = input("Masukkan Judul: ")
        author = input("Masukkan Author: ")
        library.add_item(Book(item_id, title, author))
        print("Book berhasil ditambahkan.")

    elif pilihan == "2":
        item_id = input("Masukkan ID: ")
        title = input("Masukkan Judul: ")
        issue = input("Masukkan Issue (contoh: Januari 2024): ")
        library.add_item(Magazine(item_id, title, issue))
        print("Magazine berhasil ditambahkan.")

    elif pilihan == "3":
        print("\nDAFTAR ITEM:")
        print(library.show_items())

    elif pilihan == "4":
        keyword = input("Masukkan Judul atau ID: ")
        print("\nHASIL PENCARIAN:")
        print(library.search_item(keyword))

    elif pilihan == "5":
        print("Program selesai.")
        break

    else:
        print("Pilihan tidak valid.")
