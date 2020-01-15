import uuid
import datetime
import pytz

from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute, BooleanAttribute
from pynamodb.constants import STREAM_NEW_AND_OLD_IMAGE


local_tz = pytz.timezone('Asia/Tokyo')


class OrderModel(Model):

    class Meta:
        table_name = 'order'
        region = 'ap-northeast-1'
        read_capacity_units = 1
        write_capacity_units = 1
        stream_view_type = STREAM_NEW_AND_OLD_IMAGE


    id = UnicodeAttribute(hash_key=True)
    productId = UnicodeAttribute(null=False)
    productName = UnicodeAttribute(null=False)
    productAmount = NumberAttribute(null=False)
    productPrice = NumberAttribute(null=False)
    deliveryAddress = UnicodeAttribute(null=False)
    deliveryState = NumberAttribute(null=False)
    createdAt = UnicodeAttribute(null=False)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        now = datetime.datetime.utcnow().replace(tzinfo=pytz.utc).astimezone(local_tz).strftime('%Y-%m-%d %H:%M:%S')

        self.id = str(uuid.uuid4())
        self.createdAt = now

    def save(self):
        super().save()
