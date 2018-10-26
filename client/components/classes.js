import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getClasses} from '../store'
/**
 * COMPONENT
 */
export class Classes extends Component {
  componentDidMount(){
    this.props.dispatch(getClasses());
  }
  render(){
    const { error, loading, classes } = this.props;    
    console.log('classes',classes)

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="userhome">
        <ul>
          {
            classes.map( dndClass => <li key={dndClass.name}>{dndClass.name}</li> )
          }
        </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    classes: state.classes.items,
    loading: state.classes.loading,
    error: state.classes.error
  }
}

// const mapDispatch = dispatch => {
//   return {
//     fetchClasses(){
//       dispatch(allClasses())
//     } 
//   }
// }

export default connect(mapState)(Classes)

/**
 * PROP TYPES
//  */
Classes.propTypes = {
  fetchClasses: PropTypes.func
}
