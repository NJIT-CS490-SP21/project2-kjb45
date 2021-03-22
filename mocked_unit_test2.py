import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
from collections import OrderedDict


sys.path.append(os.path.abspath('../'))

from app import get_leader_array
import models

KEY_INPUT = "input"
KEY_INPUT1 = "input1"
KEY_EXPECTED = "expected"
USER1 = 'HEY'
USER2 = 'HEYYYY'
USER3 = 'YO'

class checkLeaders(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                
                KEY_EXPECTED: [USER1, USER2, USER3]
                
                
            }
            
            ]
            
        self.initial_users = [USER1, USER2, USER3] 
    
    def mocked_array(self):
        return self.initial_users
        
    def test_success(self):
        for test in self.success_test_params:
            with patch('models.Leaders.query') as mocked_query:
                mocked_query.all = self.mocked_array
                
               
                actual_result = get_leader_array()
                expected_result = test[KEY_EXPECTED]
                self.assertEqual(len(actual_result), len(expected_result))
                self.assertEqual(actual_result[1], expected_result[1])
                self.assertEqual(actual_result[2], expected_result[2])

if __name__ == '__main__':
    unittest.main()