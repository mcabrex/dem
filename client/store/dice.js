/**
 * ACTION TYPES
 */
const ROLL_DICE = 'ROLL_DICE'
/**
 * INITIAL STATE
 */
const defaultDice = {}

/**
 * ACTION CREATORS
 */
const rollDice = (dice) => ({type: ROLL_DICE,dice})

/**
 * THUNK CREATORS
 */
export const getDice = () => dispatch => {
    const diceRoll = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const d20 = diceRoll(1,21);
      
    dispatch(rollDice(d20))
}

/**
 * REDUCER
 */
export default function(state = defaultDice, action) {
  switch (action.type) {
    case ROLL_DICE:
      return {
        ...state,
        dice: action.dice
      }
    default:
      return state
  }
}
