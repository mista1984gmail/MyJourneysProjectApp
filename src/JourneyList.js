import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const JourneyList = () => {

    const [journeys, setJourneys] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('api/v1/journeys')
            .then(response => response.json())
            .then(data => {
                setJourneys(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/v1/journey/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedJourneys = [...journeys].filter(i => i.id !== id);
            setJourneys(updatedJourneys);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const journeyList = journeys.map(journey => {
        const address = `${journey.country || ''}, ${journey.stateOrProvince || ''} ${journey.city || ''} ${journey.postalCode || ''}`;
        return <tr key={journey.id}>
            <td style={{whiteSpace: 'nowrap'}}>{journey.title}</td>
            <td>{address}</td>
            <td> {journey.dateStartOfJourney || ''}-{journey.dateEndOfJourney || ''} </td>
            <td> {journey.description || ''} </td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/journeys/" + journey.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(journey.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <tr></tr>
            <Container fluid>
                <div className="float-end" >
                    <Button color="success" tag={Link} to="/journeys/new">Add Journey</Button>
                </div>
                <h3>My Journeys</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th width="20%">Where</th>
                        <th width="20%">When</th>
                        <th>Description</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {journeyList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default JourneyList;