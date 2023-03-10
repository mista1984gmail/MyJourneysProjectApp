import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const JourneyEdit = () => {
    const initialFormState = {
        title: '',
        country: '',
        stateOrProvince: '',
        city: '',
        postalCode: '',
        dateStartOfJourney: '',
        dateEndOfJourney: '',
        description: ''
    };
    const [journey, setJourney] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/v1/journey/${id}`)
                .then(response => response.json())
                .then(data => setJourney(data));
        }
    }, [id, setJourney]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setJourney({ ...journey, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/v1/journey${journey.id ? `/${journey.id}` : ''}`, {
            method: (journey.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journey)
        });
        setJourney(initialFormState);
        navigate('/journeys');
    }

    const title = <h2>{journey.id ? 'Edit Journey' : 'Add Journey'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={journey.title || ''}
                               onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" value={journey.country || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="stateOrProvince">State/Province</Label>
                            <Input type="text" name="stateOrProvince" id="stateOrProvince" value={journey.stateOrProvince || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="text" name="city" id="city" value={journey.city || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup >
                            <Label for="country">Postal Code</Label>
                            <Input type="text" name="postalCode" id="postalCode" value={journey.postalCode || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="dateStartOfJourney">Date start of the journey</Label>
                            <Input type="date" name="dateStartOfJourney" id="dateStartOfJourney" value={journey.dateStartOfJourney || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="dateEndOfJourney">Date end of the journey</Label>
                            <Input type="date" name="dateEndOfJourney" id="dateEndOfJourney" value={journey.dateEndOfJourney || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" value={journey.description || ''}
                                   onChange={handleChange} autoComplete="address-level1"/>
                        </FormGroup>

                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/journeys">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default JourneyEdit;