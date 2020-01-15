import json

import sys
sys.path.append('..')

from utils.responseBuilder import ResponseBuilder
from utils.exceptionHandler import handle_exception
from models.order import OrderModel

def createOrder(data):
    
    order = OrderModel()
    order.productId = data['productId']
    order.productName = data['productName']
    order.productAmount = data['productAmount']
    order.productPrice = data['productPrice']
    order.deliveryAddress = data['deliveryAddress']
    order.deliveryState = data['deliveryState']
    order.save()


@handle_exception
def handler(event, context):
    print(event)

    body = json.loads(event['body'])
    data = body['data']
    print(data)

    createOrder(data)

    return ResponseBuilder.success()


if __name__ == '__main__':
    data = {
        'productId': 'productId-123123',
        'productName': 'testProduct',
        'productAmount': 12,
        'productPrice': 120210,
        'deliveryAddress': '東京都千代田区クラスメソッド',
        'deliveryState': 1,
    }
    event = {}
    event['body'] = json.dumps({ 'data': data })
    handler(event, {})
