#!/usr/bin/python3
""" LIFOCache class
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """  inherits from BaseCaching and is a caching system """

    def put(self, key, item):
        """ Must assign to the dictionary self.cache_data
        the item value for the key key """
        if key and item:
            if len(self.cache_data.items()) > BaseCaching.MAX_ITEMS:
                f_key, _ = self.cache_data.popitem(False)
                print("DISCARD:", f_key)
            else:
                self.cache_data[key] = item

    def get(self, key):
        """Must return the value in self.cache_data linked to key"""
        # return self.cache_data.get(key, None)
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
