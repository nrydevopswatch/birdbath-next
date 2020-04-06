export default function rapsaState(
  state = {
    error: null,
    whoami: {},
    dayview: {
      today: null,
      projects: []
    },
    weekview: {},
    monthview: {},
    customerview: [],
    projectview: {},
    reportview: {},
    passwordview: {},
    projectprefview: []
  },
  action
) {
  console.log(action);
  const newstate = Object.assign({}, state, action.payload);
  return newstate;
}
