const {nanoid} = require('nanoid');
const books = require('../models/books');
const {success, fail, error,statusCode, statusMessage} = require('../helpers/constanta');

const saveBookHandler = (request, h) => {
    const{name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

    if (!name){
        const response = h.response({
            status:fail,
            message:statusMessage.saveBookWithoutName,
        }).code(statusCode.badRequest);
        return response;
    }

    if (readPage>pageCount){
        const response = h.response({
            status:fail,
            message:statusMessage.saveBookReadPageBiggerThanPageCount,
        }).code(statusCode.badRequest);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new DataView().toISOString();
    const updateAt = insertedAt;

    const newBook = {id,name,year,author,summary,publisher,pageCount,readPage,reading,insertedAt,updateAt};
    books.push(newBook);

    const isSuccess = books.filter((book)=> book.id === id).length > 0;

    if (isSuccess){
        const response = h.response({
            status:success,
            message:statusMessage.saveFailed,
        });
        response.code(statusCode.error);
        return response;
    };

    const getAllBookHandler = (req,h) => {
        const {name,reading,finished} = req.query;

        const response = h.response({
            status: success,
            data:{
                books:books.map((book) =>({
                    id:book.id,
                    name:book.name,
                    publisher:book.publisher,
                })),
            },
        });


        if (reading==='1'){
            return{
                status:success,
                data:{
                    books:books.filter((book) =>book.reading === true).map((book) =>({
                        id:book.id,
                        name:book.name,
                        publisher:book.publisher,
                    })),
                },
            };
        };

        if (finished === '1'){
            return{
                status:success,
                data:{
                    books:books.filter((book) =>book.finished === true).map((book) =>({
                        id:book.id,
                        name:book.name,
                        publisher:book.publisher,
                    })),
                },
            };
        };

        if (finished === '0'){
            return{
                status:success,
                data:{
                    books:books.filter((book) =>book.finished === false).map((book) =>({
                        id:book.id,
                        name:book.name,
                        publisher:book.publisher,
                    })),
                },
            };
        };

        if (name !== undefined){
            return{
                status:success,
                data:{
                    books:books.filter((book)=>book.name.toLowerCase().includes(name.toLowerCase())).map((book)=>({
                        id:book.id,
                        name:book.name,
                        publisher:book.publisher,
                    })),
                },
            };
        }

        response.code(statusCode.success);
        return response;

    };

}