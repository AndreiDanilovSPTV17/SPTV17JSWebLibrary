import {httpModule} from './HttpModule.js';
import {userModule} from './UserModule.js';
        class BookModule {
        printNewBookForm() {
            document.getElementById('info').innerHTML='&nbsp;';
        document.getElementById('content').innerHTML = 
`<div class="row mt-5">
    <div class="col-sm-6 m-auto">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title w-100 text-center">Add Book</h5>
                <p class="card-text w-100 text-center">Fill every field</p>
                <div class="input-group mb-3">
                    <input id="name" type="text" class="form-control" placeholder="Book title" aria-label="Book title">
                </div>
                <div class="input-group mb-3">
                    <input id="author" type="text" class="form-control" placeholder="Book author" aria-label="Book author">
                </div>
                <div class="input-group mb-3">
                    <input id="publishedYear" type="text" class="form-control" placeholder="Year" aria-label="Year">
                    <input id="quantity" type="text" class="form-control" placeholder="Quantity" aria-label="Quantity">
                    <input id="price" type="text" class="form-control" placeholder="Price" aria-label="Price">
                </div>
                <div class="input-group mb-3">
                <textarea id= class="form-control" aria-label="Text" placeholder="text">
                </div>
                <a id="btnAddBook" href="#" class="btn btn-primary w-100">Add book</a>
            </div>
        </div>
    </div>
</div>`;
                document.getElementById('btnAddBook').addEventListener('click', bookModule.createBook);
        }

        createBook(){
        let name = document.getElementById('name').value;
                let author = document.getElementById('author').value;
                let publishedYear = document.getElementById('publishedYear').value;
                let quantity = document.getElementById('quantity').value;
                let price = document.getElementById('price').value;
                if (name === null || name === undefined
                        || author === null || author === undefined
                        || publishedYear === null || publishedYear === undefined
                        || quantity === null || quantity === undefined
                        || price === null || price === undefined) {
        document.getElementById('info').innerHTML = 'Fill the all fields';
                return;
        }
        let newBook = {
        "name": name,
                "author": author,
                "publishedYear": publishedYear,
                "quantity": quantity,
                "price": price,
        }
        httpModule.http('createBook', 'POST', newBook)
                .then(function(response){
                if (response === null || response === undefined){
                document.getElementById('info').innerHTML = 'Server error';
                        return;
                }
                if (response.authStatus === 'false'){
                document.getElementById('info').innerHTML = 'Please log in';
                        return;
                }
                if (response.actionStatus === 'false'){
                document.getElementById('info').innerHTML = ' ';
                        return;
                }
                document.getElementById('info').innerHTML = 'Book added'
                        bookModule.printNewBookForm();
                })
        }
        }
let bookModule = new BookModule();
        export {bookModule}
        printListBook(){
        httpModule.http('listbooks','GET')
                .then(function(response){
                    if(response === null || response === undefined) {
                    document.getElementById('info').innerHTML='Server error';
                    return;
                    }
                    if(response.authStatus === 'false'){
                    document.getElementById('info').innerHTML='Log in';
                    return;
                    }
                    if(response.actionStatus === 'false'){
                    document.getElementById('info').innerHTML='';
                    return;
                    }
                    
        document.getElementById('content').innerHTML=
            `<h2 class="w-100 text-center">Book list</h2>
            <div id="boxBooks" class="row row-cols-1 row-cols-md-3 mt-4"></div>`
        let boxBooks = document.getElementById('boxBooks');
        let books = response.data;
        for(let i=0;i< books.length;i++){
        boxBooks.insertAdjacentHTML('afterbegin',
            `<div class="cold mb-4">
            <div class="card h-100" style="width: 18em;">
            <img src="" class="card-img-top" alt="..." >
            <div class="card-body">
                <h5 class="card-title">${books[i].name}</h5>
                <p class="card-text">${books[i].author}</p>
                <p class="card-text">${books[i].price}</p>
                <div class="card-footer d-flex justify-content-between">
                <button id='btnToRead${books[i].id}' class="btn bg-primary">Read</button>
                <button id='btnToRead${books[i].id}' class="btn bg-primary">Buy</button>
               </div>
               </div>
               </div>
               </div>`
                    };   
            document.getElementById('btnToRead'+books[i].id).onclick=function(){
                bookModule.readBook(books[i].id);
            }
            document.getElementById('btnToBuy'+books[i].id).onclick=function(){
                bookModule.buyBook(books[i].id);
            }
        }
    });
    }
    readBook(bookId) {
    console.log{'readBook.bookId='+bookId);
    }
    buyBook(bookId){
        console.log('buyBook.bookId='+bookId);
    }
    }
    

