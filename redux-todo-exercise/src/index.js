import { createStore } from 'redux';
import todos from './reducers';
import { addTodo, toggleTodo, editTodo } from './actions';

// Create the store
const store = createStore(todos);

// Log initial state
console.log('Initial State:', store.getState());

// Add first todo
store.dispatch(addTodo('Dispatch my first action'));
console.log('State after adding first todo:', store.getState());

// Add more todos
store.dispatch(addTodo('Learn Redux concepts'));
console.log('State after adding second todo:', store.getState());

store.dispatch(addTodo('Build myFlix with Redux'));
console.log('State after adding third todo:', store.getState());

// Toggle first todo
store.dispatch(toggleTodo(0));
console.log('State after toggling first todo:', store.getState());

// Toggle second todo
store.dispatch(toggleTodo(1));
console.log('State after toggling second todo:', store.getState());

// Edit the third todo
store.dispatch(editTodo(2, 'Build an amazing myFlix app with Redux'));
console.log('State after editing third todo:', store.getState());

// Toggle third todo
store.dispatch(toggleTodo(2));
console.log('State after toggling third todo:', store.getState());
