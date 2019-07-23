import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'
import { Paper, TextField, Box, Typography, Button, withStyles } from '@material-ui/core'

import { CommentFormStyles } from '../style/muiStyles'
import { addComment } from '../utilities/api'

const StyledRating = withStyles({
  iconFilled: {
    color: '#EBBC00'
  }
})(Rating)

const CommentForm = ({ movieId }) => {
  const classes = CommentFormStyles()

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(null)

  const handleSubmit = () => {
    const userInput = {
      rating,
      comment,
      movieId
    }

    return addComment(userInput)
      .then(() => {
        setComment('')
        setRating(null)
      })
      .catch(err => { 
        console.error(err)
      //  dispatch error message when connected to the store (dispatch(error?(err.message))
      })
  }

  return (
    <Paper className={classes.paper}>
      <Box component="fieldset" borderColor="transparent">
        <Typography className={classes.text} component="legend">Rate the movie:</Typography>
        <StyledRating
          name="user rating"
          value={rating}
          onChange={(e, newValue) => {
            setRating(newValue)
          }}
        />
      </Box>
      <TextField
        id="comment"
        label="Leave a comment"
        multiline
        rowsMax="10"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
        className={classes.comment}
        margin="normal"
        variant="outlined"
      />
      <br/>
      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
    </Paper>
  )
}

export default CommentForm

CommentForm.propTypes = {
  movieId: PropTypes.number
}
