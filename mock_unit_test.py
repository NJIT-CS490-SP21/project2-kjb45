import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys



sys.path.append(os.path.abspath('../'))
from app import leader_winner
import models

KEY_INPUT = "input"
KEY_INPUT1 = "input1"
KEY_EXPECTED = "expected"
WINNER = "Kash"
LOSER = "Jimmy" 

class LeaderBoardTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: WINNER,
                KEY_INPUT1: LOSER,
                KEY_EXPECTED: {WINNER: 101, LOSER: 99},
                
            },
            
            ]
        
        userOne = models.Leaders(username=WINNER, wins=100)
        userTwo = models.Leaders(username=LOSER, wins = 100)
        self.initial_db_mock = {userOne, userTwo} 
     
    def mocked_db_session_leader_update(self):
        return self.initial_db_mock
    
    def mocked_db_session_commit(self):
        pass
    
    
        
    def test_success(self):
        for test in self.success_test_params:
            with patch('models.Leaders.query.get') as mocked_query:
                mocked_query.all = self.mocked_db_session_leader_update
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    actual_result = leader_winner(test[KEY_INPUT], test[KEY_INPUT1])
                    print(actual_result)
                    expected_result = test[KEY_EXPECTED]
                    print(expected_result)
                    
                    self.assertEqual(len(actual_result), len(expected_result))
                    #self.assertEqual(actual_result[WINNER] = expected_result[WINNER])
                    
                    


if __name__ == '__main__':
    unittest.main()
            