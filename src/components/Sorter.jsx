import React, { useState } from 'react'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  SORT_RATING_HIGH_LOW,
  SORT_RATING_LOW_HIGH,
  SORT_ALPHABETICAL_ASCENDING,
  sortBy
} from '../actions/sort'
import { SorterStyle } from '../style/muiStyles'

const Sorter = ({ dispatch }) => {
  const classes = SorterStyle()

  const handleChange = ({ target: { value } }) => {
    setMenuValue(value)
    dispatch(sortBy(value))
  }

  const [menuValue, setMenuValue] = useState()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="sort">Sort Movies</InputLabel>
      <Select
        onChange={handleChange}
        value={menuValue}
        input={<OutlinedInput name="sort" id="sort" />}
      >
        <MenuItem value={SORT_ALPHABETICAL_ASCENDING}>Sort A-Z</MenuItem>
        <MenuItem value={SORT_RATING_HIGH_LOW}>Rating High to Low</MenuItem>
        <MenuItem value={SORT_RATING_LOW_HIGH}>Rating Low to High</MenuItem>
      </Select>
    </FormControl>
  )
}

export default connect()(Sorter)

Sorter.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func
}
