import config from './config';

const initialLocale = 'en';

export default {
  $pendingActions: {},
  auth: {
    form: {
      fields: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  i18n: {
    formats: {},
    locales: initialLocale
  },
  newTodo: {
    title: ''
  },
  todos: [
    {id: 1, title: 'consider ‘stop doing’ app'},
    {id: 2, title: 'relax'}
  ],
  user: {
    authData: null
  }
}
