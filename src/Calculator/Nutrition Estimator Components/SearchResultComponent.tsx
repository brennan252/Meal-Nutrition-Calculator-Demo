// "SearchResultComponent.tsx"
// Search Result component rendered in NameCheckInterface.tsx 
// on mounting calls get(/names/).
// If one match is returned, add the ID and name and unmount the component.
// Otherwise, show multiple match display or no match display based on the match count

import * as React from 'react';
import { Alert, Button, Spinner, Dropdown, DropdownButton, Form } from 'react-bootstrap';

type Props = {
    name: string;
    index: number;

    onResetName: any;
    onSuggestionSelect: any;
    onSuccessSuggestion: any;
};


export const SearchResultComponent = (Props: Props) => {
    const [noMatch, setNoMatch] = React.useState(false);
    const [multipleMatch, setMultipleMatch] = React.useState(false);
    
    const [matchNames, setMatchNames] = React.useState([]);
    const [matchIDs, setMatchIDs] = React.useState([] as Array<number>);
    const [isLoading, setIsLoading] = React.useState(true);

    // Fake get(/names)
    React.useEffect(() => {
        const nameAppendage = [' roasted, unsalted', ' deep fried, salted', ' raw, unsalted']
        const dummyIds = [1093, 1043, 1034];
        let dummyMatchCount = 0;
        let dummyNameMatches = [];
        let dummyIdMatches = [];

        // If name is longer than 5 characters assign three fake matches if not assign a fake "no match"
        if (Props.name.length > 5) {
            dummyMatchCount = nameAppendage.length;
            nameAppendage.map((appendage) => dummyNameMatches.push(Props.name.concat(appendage)));
            dummyIdMatches = dummyIds;
        } 

        let newMultipleMatch = false;
        let newNoMatch = false;

        // Multiple Matches
        if (dummyMatchCount > 1) {
            newMultipleMatch = true;
        }

        // One Match
        if (dummyMatchCount === 1) {
            Props.onSuccessSuggestion(Props.index, dummyNameMatches[0], dummyIdMatches[0]);
        }

        // Zero Matches
        if (dummyMatchCount === 0) {
            newNoMatch = true;
        };

        setMultipleMatch(newMultipleMatch);
        setNoMatch(newNoMatch);
        setMatchNames(dummyNameMatches);
        setMatchIDs(dummyIdMatches);
        setIsLoading(false);
    }, []);

    
    if (isLoading) {
        return (
            <div>
                <Form.Row className="justify-content-center" >
                    <Spinner animation="border" variant="primary" />
                </Form.Row>
                <Form.Row className="justify-content-center" >
                    <Button onClick={Props.onResetName} variant="danger">Cancel</Button>
                </Form.Row>
            </div>)
    } else {
        return (
            <div>
                {noMatch &&
                    <Form.Row className="justify-content-center align-items-center" >
                        <Alert variant="danger">No Matches Found for {Props.name} </Alert>
                    </Form.Row>}
                {noMatch &&
                    <Form.Row className="justify-content-center align-items-center" >
                         <Button onClick={Props.onResetName} variant="danger">Reset</Button>
                    </Form.Row>}


                {multipleMatch &&
                    <Form.Row className="justify-content-center align-items-center" >
                        <Alert variant="info">Multiple Matches Found for {Props.name} </Alert>
                    </Form.Row>}
                {multipleMatch &&
                    <Form.Row className="justify-content-center align-items-center">
                        <DropdownButton variant="secondary" text="light" title="Select A Name" >
                            {matchNames.map((name) =>
                                <Dropdown.Item key={Props.index.toString().concat('_', name)}
                                    eventKey={Props.index.toString().concat('_', name, '_', matchIDs[matchNames.indexOf(name)].toString())}
                                    onSelect={Props.onSuggestionSelect}>{name}</Dropdown.Item>)}
                        </DropdownButton>
                    </Form.Row>}
                {multipleMatch &&
                    <br />}
                {multipleMatch &&
                    <Form.Row className="justify-content-center align-items-center" >  
                        <Button onClick={Props.onResetName} variant="danger">Reset</Button>
                    </Form.Row>}
            </div>)
        }
    };