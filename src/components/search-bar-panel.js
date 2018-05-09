import React from "react";
import '../style/search_bar.css';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

export const SearchBarPanel = ({ onBlur, term, onChange, onFocus, currentPanel }) => {
  return (
    <Grid>
      <Row className="show-grid">
        <Col sm={12}>
        <div className='form-search' tabIndex="1" onBlur={onBlur}>
        <form>
        <FormGroup bsSize="sm" controlId="search">
        <InputGroup bsSize="sm">
            <FormControl
              type="text"
              value={term}
              placeholder="Search food"
              onChange={onChange}
              onFocus={onFocus}
              className='search-bar'
              autoComplete="off"
            />
            <InputGroup.Addon>
          <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        </form>
        {currentPanel}
       </div>
        </Col>
      </Row>
    </Grid>
  )
}
