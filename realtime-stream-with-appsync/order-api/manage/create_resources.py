import sys
sys.path.append('..')

from models.order import OrderModel

# OrderModel.delete_table()
OrderModel.create_table()