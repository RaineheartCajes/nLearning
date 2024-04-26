import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    username: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    loanType: { type: String, required: true },
    isDocumentAvailable: { type: Boolean, required: true },
    pdfUrl: { type: String }  

}, {
    timestamps: true 
});

export const LoanModel = mongoose.model('loan', LoanSchema);

export const getLoansByUserId = (userId: string) => LoanModel.find({ userId });
export const getLoans = (query = {}) => LoanModel.find(query);
export const getLoanById = (id: string) => LoanModel.findById(id);
export const createLoan = (values: Record<string, any>) => new LoanModel(values).save();
export const deleteLoanById = (id: string) => LoanModel.findByIdAndDelete(id);
export const updateLoanById = (id : string, values: Record<string, any>) => {
    return LoanModel.findByIdAndUpdate(id, values, { new: true, lean: true }).exec();
  };
