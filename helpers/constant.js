const success = 'success';
const fail = 'fail';
const error = 'error';
const statusCode = {
    success:200,
    error:500,
    notFound:404,
    unauthorized:401,
    conflict:409,
    saved:201,
    badRequest:400,
    noContent:204,
};
const statusMessage = {
    saveBookWithoutName: 'Failed to Add, Please Fill Name Book!',
    saveBookReadPageBiggerThanPageCount:'Failed to Add Book, readPage > pageCount, Please Fill Lower readPage',
    saveSuccessful:'Success to Add Book',
    saveFailed:'Failed to Add Book',
    bookNoutFound:'Book Not Found',
    updateBookWithoutName:'Failed to Update Data Book, Please Fill Name Book!',
    updateBookReadPageBiggerThanPageCount:'Failed to Update Data Book, readPage > pageCount, Please Fill Lower readPage',
    updateSuccessful:'Success to Update Data Book',
    updateFailed:'Failed to Update Data Book',
    deleteSuccessful:'Success to Delete Data Book',
    deleteFailed:'Failed to Delete Data Book',
};

module.exports = {success,fail,error,statusCode,statusMessage};

