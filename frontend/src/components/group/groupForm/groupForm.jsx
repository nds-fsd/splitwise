import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./groupform.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { useDarkMode } from "../../../context/darkModeContext";

const GroupForm = ({ onClose, onSubmit, title, defaultValues = {}, groupMembers, createdBy = '' }) => {
    const { darkMode } = useDarkMode();
    const minMembers = title === 'Create group' ? 1 : 2;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: defaultValues.name,
            description: defaultValues.description,
            members: groupMembers ?
                groupMembers.map(m => ({ email: m.email }))
                : Array.from({ length: minMembers }, () => ({ email: "" }))
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "members",
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={`${styles.form} ${darkMode ? styles.formDark : ''}`}>
            <div className={styles.top}>
                <h2>{title}</h2>
                <IoCloseOutline className={styles.btn} onClick={onClose} />
            </div>

            <div className={styles.formFields}>
                <div className={styles.formField}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Trip to Madrid"
                        autoFocus
                        {...register("name", {
                            required: "Name is required",
                            maxLength: { value: 30, message: 'name is to large' },
                        })}
                        className={`${styles.input} ${errors.name ? styles.errorInput : ""} ${darkMode ? styles.inputDark : ''}`}
                    />
                    {errors.name && (
                        <span className={styles.errorText}>{errors.name.message}</span>
                    )}
                </div>

                <div className={styles.formField}>
                    <label htmlFor="description" className={styles.label}>Description</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Trip to madrid in february"
                        {...register("description", {
                            required: "Description is required",
                            maxLength: { value: 50, message: 'description is to large' },
                        })}
                        className={`${styles.input} ${errors.description ? styles.errorInput : ""} ${darkMode ? styles.inputDark : ''}`}
                    />
                    {errors.description && (
                        <span className={styles.errorText}>{errors.description.message}</span>
                    )}
                </div>

                <div className={styles.formField}>
                    <label htmlFor="email" className={styles.label}>Group members</label>
                    {createdBy && (
                        <p className={styles.createdBy} key={createdBy}>{createdBy}</p>
                    )}
                    {fields.map((field, index) => (
                        <div key={field.id} className={styles.emailField}>
                            <div className={styles.row}>
                                <input
                                    id={`email-${index}`}
                                    type="email"
                                    placeholder="Email address"
                                    {...register(`members.${index}.email`, {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className={`${styles.input} ${errors.members?.[index]?.email ? styles.errorInput : ""} ${darkMode ? styles.inputDark : ''}`}
                                />
                                <div>
                                    {fields.length > minMembers && (
                                        <IoCloseOutline className={`${styles.btn} ${styles.redBtn}`} onClick={() => remove(index)} />
                                    )}
                                </div>
                            </div>
                            {errors.members?.[index]?.email && (
                                <span className={styles.errorText}>{errors.members[index].email.message}</span>
                            )}
                        </div>
                    ))}
                    <button className={styles.addBtn} type="button" onClick={() => append("")} id="add-member">
                        Add Member
                    </button>
                </div>
            </div>


            <div className={styles.submit}>
                <button type="submit" className={styles.submitButton} id='submit-btn'>
                    {title}
                </button>
            </div>
        </form>
    );
};


export default GroupForm;