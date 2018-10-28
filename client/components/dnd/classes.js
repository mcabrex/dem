import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getClasses} from '../../store'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class Classes extends Component {
  componentDidMount(){
    this.props.dispatch(getClasses());
  }
  render(){
    const { error, loading, classes } = this.props;    

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>;
    }

    return (
        <div className="classes">
          {
            classes.map( dndClass => (
              <div key={dndClass.name} className="classes-name">
                <Link 
                  to={'/classes/' + dndClass.name} 
                  className="classes-name-link">
                  {dndClass.name}
                </Link>
              </div>
            ))
          }
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

export default connect(mapState)(Classes)

/**
 * PROP TYPES
//  */
Classes.propTypes = {
  fetchClasses: PropTypes.func
}
