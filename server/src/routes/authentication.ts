import express from 'express';

import {register, login } from '../controller/user-authentication';
import { getTableUsers } from '../controller/tableUser';
import { deleteUser } from '../controller/tableUser';
import { createLoanController } from '../controller/loan';
import { upload } from '../middleware/multer';
import { getLoansController } from '../controller/loan';
import { getLoansByUserController } from '../controller/loan';
import { updateLoanController } from '../controller/loan';

export default (router: express.Router) => {
    
    
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/users', getTableUsers);
    router.delete('/auth/users/:id', deleteUser);
    router.post('/loans', upload.single('pdf'), createLoanController);
    router.get('/loans', getLoansController);
    router.get('/loans/user/:userId', getLoansByUserController);
    router.patch('/loans/:loanId', upload.single('pdf'), updateLoanController);

}