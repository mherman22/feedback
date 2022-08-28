import React, { useState } from 'react';
import { Stack, Button, Form, TextArea, TextInput } from '@carbon/react';

function CustomerPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    let handleFormSubmiting = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8080/feedback/v1/customer/create", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    feedback: feedback,
                }),
            });

            if (res.status === 200) {
                setName("");
                setEmail("");
                setFeedback("");
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form style={{ maxWidth: '400px', margin: '0 auto', transform: 'translate(-50%,-50%)', top: '50%', left: '50%', position: 'absolute' }} onSubmit={handleFormSubmiting}>
            <Stack gap={7}>
                <TextInput id="name" value={name} placeholder='john smith' type='text' labelText="Name" onChange={e => setName(e.target.value)} />
                <TextInput id="email" value={email} placeholder='example@feed.com' labelText="Email address" onChange={e => setEmail(e.target.value)} />
                <TextArea labelText="Customer feedback" value={feedback} placeholder='Your feedback is highly appreciated' helperText="Give us your feedback!"
                    cols={50}
                    rows={4}
                    id="customer-feedback"
                    onChange={e => setFeedback(e.target.value)}
                />
                <Button type='submit'>Submit</Button>
            </Stack>
        </Form>
    );
};

export default CustomerPage;