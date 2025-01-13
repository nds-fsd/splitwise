const Payment = require("../mongo/schemas/payment");
const Expense = require("../mongo/schemas/expense");


const getPaymentsByExpense = async (req, res) => {
    try {
        const expenseId = req.params.expenseId;

        const payments = await Payment.find({ expense: expenseId }).populate("user");
        if (!payments || payments.length === 0) {
            return res.status(404).json({ error: "No hay pagos para este expense." });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los pagos." });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status, amountPaid, paymentMethod } = req.body;

        // Validar datos
        if (!["pending", "completed", "failed"].includes(status)) {
            return res.status(400).json({ error: "Estado inválido." });
        }

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ error: "Payment no encontrado." });
        }

        // Actualizar el Payment
        payment.paymentStatus = status;
        if (amountPaid) payment.amountPaid = amountPaid;
        if (paymentMethod) payment.paymentMethod = paymentMethod;

        await payment.save();

        res.status(200).json({ message: "Payment actualizado exitosamente.", payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el payment." });
    }
};

module.exports = { getPaymentsByExpense, updatePaymentStatus };
