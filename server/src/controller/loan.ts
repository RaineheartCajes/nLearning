import express, { Request, Response } from 'express';
import { createLoan, getLoans, getLoansByUserId, updateLoanById } from '../models/loan';

export const createLoanController = async (req: express.Request, res: express.Response) => {
    try {  
        const { userId, username, loanAmount, loanType, isDocumentAvailable } = req.body;
        const pdfUrl = req.file ? req.file.path : null;

        const loan = await createLoan({
            userId,
            username,
            loanAmount,
            loanType,
            isDocumentAvailable: isDocumentAvailable === 'true',
            pdfUrl
        });
        
        res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        console.error('Failed to create loan:', error);
        res.status(500).json({ message: 'Failed to create loan', error: error.message });
    }
}

export const getLoansController = async (req: express.Request, res: express.Response) => {
    try {
        const search = req.query.search;
        const query = search ? { $or: [
            { username: { $regex: search, $options: 'i' } },
            { loanType: { $regex: search, $options: 'i' } }
        ] } : {};
        
        const loans = await getLoans(query);
        res.status(200).json(loans.map(loan => ({
            username: loan.username,
            loanAmount: loan.loanAmount,
            loanType: loan.loanType,
            isDocumentAvailable: loan.isDocumentAvailable,
            pdfUrl: loan.pdfUrl,
        })));
    } catch (error) {
        console.error('Failed to get loans:', error);
        res.status(500).json({ message: 'Failed to get loans', error: error.message });
    }
};

export const getLoansByUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const loans = await getLoansByUserId(userId);
        res.status(200).json(loans);
    } catch (error) {
        console.error('Failed to get loans by user ID:', error);
        res.status(500).json({ message: 'Failed to retrieve loans', error: error.message });
    }
};

export const updateLoanController = async (req: Request, res: Response) => {
    try {
        const loanId = req.params.loanId;
       
        
        const { userId, username, loanAmount, loanType, isDocumentAvailable, pdfUrl } = req.body;
        console.log(`Received update data:`, { userId, username, loanAmount, loanType, isDocumentAvailable, pdfUrl });


        const updatedLoan = await updateLoanById(loanId, {
            userId,
            username,
            loanAmount,
            loanType,
            isDocumentAvailable,
            pdfUrl: req.file ? req.file.path : undefined 
        });

        

        if (updatedLoan) {
            res.status(200).json({ message: 'Loan updated successfully', loan: updatedLoan });
        } else {
            res.status(404).json({ message: 'Loan not found' });
        }
    } catch (error) {
        console.error('Failed to update loan:', error);
        
        res.status(500).json({ message: 'Failed to update loan', error: error.message });
    }
};