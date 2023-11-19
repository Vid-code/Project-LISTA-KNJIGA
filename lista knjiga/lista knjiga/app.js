let nizKnjiga = JSON.parse(localStorage.getItem('knjige')) || []



class Book {
    constructor(t,a,i) {
        this.title = t
        this.author = a
        this.isbn = i
    }
}
class UI {
    addBooksToList(books){
        const list = document.getElementById('book-list')
        localStorage.setItem('knjige', JSON.stringify(books))
        console.log(books)
        const b = JSON.parse(localStorage.getItem('knjige'))
        // const row = document.createElement('tr')
        list.innerHTML = ''
        for(let i = 0; i < b.length; i++){
            list.innerHTML += `
            <tr>
            <td>${books[i].title}</td>
            <td>${books[i].author}</td>
            <td>${books[i].isbn}</td>
            <td><a class="delete">X</a></td>
            </tr>
        `
        }
        // list.appendChild(row)
    }

    showAlert(message,classN){
        const div = document.createElement('div')
        div.className = `alert ${classN}`

        div.appendChild(document.createTextNode(message))
        
        const container = document.querySelector('.container')
        const form = document.getElementById('book-form')
        container.insertBefore(div,form)

        setTimeout(() => {
            document.querySelector('.alert').remove()
        },3000);
    }
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
            const isbn = target.parentElement.previousElementSibling.textContent;
            nizKnjiga = nizKnjiga.filter(book => book.isbn !== isbn )
            localStorage.setItem("knjige", JSON.stringify(nizKnjiga))
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }


    // addLocalStorage (book) {
    //     let nizKnjiga; 

    //     if(localStorage.getItem('knjige') == ''){
    //         nizKnjiga = []
    //     }else {
    //         nizKnjiga.push(book)
    //         localStorage.setItem('knjige', JSON.stringify(nizKnjiga))
    //     }
    //         // console.log(x);
    //         }
    //  getFromLocalStorage() {
    //         // nizKnjiga = JSON.parse(localStorage.getItem('knjige'))
    //         }

}

document.getElementById('book-form').addEventListener('submit', e => {
    e.preventDefault()
    console.log(e);
    console.log(e.target);
    const title = e.target[0].value
    const author = e.target[1].value
    const isbn = e.target[2].value

    const book = new Book(title,author,isbn)
    console.log(book);

    const ui = new UI()
    console.log(ui);
    if(title == '' || author == '' || isbn == ''){
        ui.showAlert("Popuni sva polja", "error")
    } else {
      nizKnjiga.push(book)
      ui.addBooksToList(nizKnjiga)

      ui.showAlert("Uspesno ste dodali knjigu", 'success')
      ui.clearFields()  
    }
})
document.getElementById('book-list').addEventListener('click', e => {
    const ui = new UI()
    console.log(e.target);

    if(e.target.className === 'delete'){
        ui.deleteBook(e.target)
        ui.showAlert("Uspesno ste obrisali knjigu!", 'success')
    }
    e.preventDefault

   

})
const ui = new UI()
ui.addBooksToList(nizKnjiga)
ui.deleteBook(nizKnjiga)
