from lxml import etree

class Template:
    """A class for manipulating HTML documents"""
    def __init__(self, template):
        self.etree = etree.XML(template)
    def render(self, obj):
        """
        Takes an object {'foo_id': 'content', ...} and inserts the content into
        the DOM element matching <div id='foo_id'></div>, returning the HTML
        document.
        
        All of the object keys will be applied as long as there is an id that
        matches in the template document.
        """
        root = self.etree
        
        for key in obj.keys():
            # xpath syntax: http://effbot.org/zone/element-xpath.htm
            selector = ".//div[@id='%s']" % key
            to_replace = root.find(selector)
            if to_replace is not None:
                root.find(selector).text = obj[key]

        return etree.tostring(root, method='html', pretty_print=True)
