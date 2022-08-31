import React, { useState } from 'react';
import { Stack, Button, Form, TextArea, TextInput, InlineLoading, Modal } from '@carbon/react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function CustomerPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Submitting...');
    const [ariaLive, setAriaLive] = useState('off');

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            feedback: ""
        },

        validationSchema: Yup.object({
            name: Yup.string().max(20, 'Must be 20 characters or less').required('The Customer full name is required!'),
            email: Yup.string().email("Field should contain a valid e-mail").max(255).required("E-mail Address is required"),
            feedback: Yup.string().min(25, 'Must be 25 characters and above').required("Customer Feedback is required!")
        })
    });

    const postData = {
        name: name,
        emailAddress: email,
        customerFeedback: feedback,
    }

    const handleFormSubmiting = async (e) => {
        e.preventDefault();

        if (name == null || email == null || feedback == null) {
            setSuccess(false);
            setDescription("fields cannot be open!")
        }

        setIsSubmitting(true);
        setAriaLive('assertive');

        axios.post("http://localhost:8080/feedback/v1/customer/create", postData)
            .then(res => console.log(res.data));
        setIsSubmitting(false);
        setSuccess(true);
        setDescription('Submitted!');
        setName("");
        setEmail("");
        setFeedback("");
    };

    return (
        <Form style={{ maxWidth: '400px', margin: '0 auto', transform: 'translate(-50%,-50%)', top: '50%', left: '50%', position: 'absolute' }} onSubmit={handleFormSubmiting}>
            <Stack gap={7}>
                {formik.touched.name && formik.errors.name ? (
                    <p style={{ 'color': 'red', 'fontSize': '0.7rem' }}>{formik.errors.name}</p>
                ) : <TextInput
                    id="name"
                    value={name}
                    placeholder='john smith'
                    type='text'
                    labelText="Name"
                    onBlur={formik.handleBlur}
                    onChange={e => setName(e.target.value)}
                />}

                <TextInput
                    id="email"
                    value={email}
                    placeholder='example@feed.com'
                    labelText="Email address"
                    onBlur={formik.handleBlur}
                    onChange={e => setEmail(e.target.value)}
                />
                {formik.touched.email && formik.errors.email ? (
                    <p style={{ 'color': 'red', 'fontSize': '0.7rem' }}>{formik.errors.email}</p>
                ) : null}

                <TextArea
                    labelText="Customer feedback"
                    value={feedback}
                    placeholder='Your feedback is highly appreciated'
                    helperText="Give us your feedback!"
                    cols={50}
                    rows={4}
                    onBlur={formik.handleBlur}
                    id="feedback"
                    onChange={e => setFeedback(e.target.value)}
                />
                {formik.touched.feedback && formik.errors.feedback ? (
                    <p style={{ 'color': 'red', 'fontSize': '0.7rem' }}>{formik.errors.feedback}</p>
                ) : null}

                {isSubmitting || success ? (
                    // <Modal
                    //     open
                    //     passiveModal
                    //     modalHeading="Feedback successfully submitted"></Modal>
                    <InlineLoading
                        style={{ marginLeft: '1rem' }}
                        description={description}
                        status={success ? 'finished' : 'active'}
                        aria-live={ariaLive}
                    />
                ) : (
                    <Button type='submit'>Submit</Button>
                )}
            </Stack>
        </Form>
    );
};

export default CustomerPage;