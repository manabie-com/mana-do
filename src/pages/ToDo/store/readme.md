# Store

I have moved the store from the directory /src/ to each page that uses useReducer (in this case: Todo Page)

This is because this app only uses the Redux patterns (by using useReducer) but not Redux. It also not necessary at this scale to utilize global states / state management libraries 