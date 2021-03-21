import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
from collections import OrderedDict


sys.path.append(os.path.abspath('../'))
from app import leader_winner
import models

KEY_INPUT = "input"
KEY_INPUT1 = "input1"
KEY_EXPECTED = "expected"
WINNER = "hello"
LOSER = "there" 


userOne = models.Leaders(username=WINNER, wins=100)
userTwo = models.Leaders(username=LOSER, wins=100)


class LeaderBoardTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: WINNER,
                KEY_INPUT1: LOSER,
                KEY_EXPECTED: {WINNER: 101, LOSER: 99},
                
            },
            
            ]
        
     
        self.initial_db_mock = {userOne.username: userOne.wins, userTwo.username: userTwo.wins} 
       
             
    def mocked_db_session_leader_update(self,username):
        if username == WINNER:
            return userOne
        
        if username == LOSER:
            return userTwo
        
    def mocked_db_session_commit(self):
        pass
    
   
        
    def test_success(self):
        for test in self.success_test_params:
            with patch('models.Leaders.query') as mocked_query:
                mocked_query.get = self.mocked_db_session_leader_update
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                   
                    
                    print("this is the mocked db")
                    print(self.initial_db_mock)
                    print("this is actual results")
                    actual_result = leader_winner(test[KEY_INPUT], test[KEY_INPUT1])
                    print(actual_result)
                    expected_result = test[KEY_EXPECTED]
                    print("this is expected resuts")
                    print(expected_result)
                    
                    
                    
                    self.assertEqual(len(actual_result), len(expected_result))
                    self.assertEqual(actual_result[WINNER],expected_result[WINNER])
                    self.assertEqual(actual_result[LOSER],expected_result[LOSER])
                    
                    #self.assertEqual(actual_result[LOSER],expected_result[LOSER])
                            
                    
                    


if __name__ == '__main__':
    unittest.main()
            