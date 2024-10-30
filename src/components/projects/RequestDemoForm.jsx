import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RequestDemoForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        projectTitle: '', // Add projectTitle to formData
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state for tracking submission
    const navigate = useNavigate();
    const location = useLocation();

    // Capture project title from location state
    React.useEffect(() => {
        if (location.state && location.state.title) {
            setFormData((prevData) => ({
                ...prevData,
                projectTitle: location.state.title,
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting to true at the beginning
        try {
            const response = await fetch('https://testmanagement.pythonanywhere.com/api/blog/request-demo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Demo request sent successfully!');
                setSubmitted(true);
                navigate('/thank-you'); // Navigate to a thank-you page or back to the projects.
            } else {
                alert('Failed to send demo request.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset submitting state after processing
        }
    };

    return (
        <Container className="py-5">
            <Row className="mb-4 text-center">
                <Col>
                    <h1 className="display-4">Request a Demo</h1>
                    <p className="lead">Fill out the form below to request a demo for one of our solutions.</p>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="projectTitle">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Project Title"
                                name="projectTitle"
                                value={formData.projectTitle}
                                readOnly // Make it read-only
                            />
                        </Form.Group>

                        <Form.Group controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter any additional details"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Please Wait...' : 'Submit Request'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
