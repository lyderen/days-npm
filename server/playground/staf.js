  
//  to hold the  token from server  hold them in sepcicif place i the user browser
//  axios.default.headares.comman['auteorezion'] =`bearer ${token}`;
// delete axios.default.headeres.comman['auteorezion'];

/*

  sotre > old the specific funcunality in the redux days & filter & auth.
      rediucers > old tha switch cases for all thisng  actouly that nide to append in redux.
       actions > old the funcatun that get data from the user and send to redoucer to specififc 
                 case to make the chainge in the store.
       selctore > old the grnerl fun that make the minpoliation on the redux store according that user
                  ask to wich filter append to show on sreen          
                  
 qdd -thunk- to depedenci taht allow u to add a asynce fun to action
 user /account add a fun  to actions insude the fun send to db then call to dispatch with the dtata tah we nide 
       add days.
 auth:
     add a new  redoucer for auth to know hoo is that user and using thise date t show userDitealis
     signin make difrent file for auth then make  fun that call auth  and ansower if the user exsist or not

   add loguot button to any page (header) and back to home page to use logout not indseude comonent router nide the history 
   imself yarn add history (not from dispatch.histroy.push)
       






*/