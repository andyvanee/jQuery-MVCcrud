import unittest, sys

sys.path.append('app')

import template

class TestTemplate(unittest.TestCase):

    def setUp(self):
        pass

    def test_basic_replace(self):
        t = template.Template(open('test/fixtures/basic_page.html', 'r').read())
        out = t.render({'content': 'this is some content'})
        self.assertIn('this is some content', out)

if __name__ == '__main__':
    unittest.main()