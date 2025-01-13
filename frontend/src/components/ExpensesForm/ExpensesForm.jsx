import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "./expenseform.module.css";

const ExpenseForm = ({ userId, groupId, onSubmit }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: "",
            totalAmount: "",
            participants: [{ user: "", amountOwed: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "participants",
    });

    const handleFormSubmit = (data) => {
        // Llama a la función onSubmit pasando los datos
        onSubmit({ ...data, groupId });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            <h2>Create Expense</h2>

            {/* Description */}
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    {...register("description", { required: "Description is required" })}
                    className={errors.description ? styles.errorInput : ""}
                />
                {errors.description && (
                    <span className={styles.errorText}>{errors.description.message}</span>
                )}
            </div>

            {/* Total Amount */}
            <div className={styles.formGroup}>
                <label htmlFor="totalAmount">Total Amount</label>
                <input
                    id="totalAmount"
                    type="number"
                    step="0.01"
                    {...register("totalAmount", {
                        required: "Total amount is required",
                        min: { value: 0.01, message: "Amount must be greater than 0" },
                    })}
                    className={errors.totalAmount ? styles.errorInput : ""}
                />
                {errors.totalAmount && (
                    <span className={styles.errorText}>{errors.totalAmount.message}</span>
                )}
            </div>

            {/* Participants */}
            <div className={styles.participants}>
                <label>Participants</label>
                {fields.map((field, index) => (
                    <div key={field.id} className={styles.participantRow}>
                        <input
                            type="text"
                            placeholder="User ID"
                            {...register(`participants.${index}.user`, {
                                required: "Participant ID is required",
                            })}
                            className={errors.participants?.[index]?.user ? styles.errorInput : ""}
                        />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Amount Owed"
                            {...register(`participants.${index}.amountOwed`, {
                                required: "Amount is required",
                                min: { value: 0.01, message: "Amount must be greater than 0" },
                            })}
                            className={errors.participants?.[index]?.amountOwed ? styles.errorInput : ""}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className={styles.removeButton}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ user: "", amountOwed: "" })}
                    className={styles.addButton}
                >
                    Add Participant
                </button>
            </div>

            {/* Submit */}
            <div className={styles.formGroup}>
                <button type="submit" className={styles.submitButton}>
                    Create Expense
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
