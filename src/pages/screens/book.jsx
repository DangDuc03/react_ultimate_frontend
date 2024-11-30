import { useEffect, useState } from "react";
import BookForm from "../../components/books/book.form.control";
import BookTable from "../../components/books/book.table";
import { getAllBooksAPI } from "../../services/api.service";
import BookFormUnControl from "../../components/books/book.form.uncontrol";

const BooksPage = () => {
    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5) // thực tế thì tối thiểu thường hiển thị 10 phần tử
    const [total, setTotal] = useState(0)

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [loadingTable, setLoadingTable] = useState(null)


    useEffect(() => {
        loadBooks()
    }, [current, pageSize])

    const loadBooks = async () => {
        setLoadingTable(true)
        const response = await getAllBooksAPI(current, pageSize)
        if (response.data) {
            setDataBook(response.data.result)
            setCurrent(response.data.meta.current)
            setPageSize(response.data.meta.pageSize)
            setTotal(response.data.meta.total)
        }
        setLoadingTable(false)
    }

    const onHandleUploadFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }
        const file = event.target.files[0]
        console.log("check files upload book: ", file)
        if (file) {
            setSelectedFile(file) // save file
            setPreview(URL.createObjectURL(file)) // create URL for File
        }
    }

    return (
        <div>
            {/* <BookForm
                loadBooks={loadBooks}
            /> */}
            <BookFormUnControl
                loadBooks={loadBooks}
                selectedFile={selectedFile}
                preview={preview}
                onHandleUploadFile={onHandleUploadFile}
                setSelectedFile={setSelectedFile}
                setPreview={setPreview}
            />
            <BookTable
                loadBooks={loadBooks}
                current={current}
                pageSize={pageSize}
                total={total}
                dataBook={dataBook}
                setPageSize={setPageSize}
                setCurrent={setCurrent}
                onHandleUploadFile={onHandleUploadFile}
                setPreview={setPreview}
                preview={preview}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                loadingTable={loadingTable}
            />
        </div>
    )
}

export default BooksPage;