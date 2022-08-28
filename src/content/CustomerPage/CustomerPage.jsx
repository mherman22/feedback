import React, { useState } from 'react';
import { Stack, Button, Form, TextArea, TextInput } from '@carbon/react';

function CustomerPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleFormSubmiting = e => {
        e.preventDefault();
        console.log("customer details: " + name + "," + email + "," + feedback)
    }

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