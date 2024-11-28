import mongoose from "mongoose";
import { CallbackWithoutResultAndOptionalError } from "mongoose";

interface IOrder extends mongoose.Document {
  customerName: string,
  items: { quantity: number; price: number }[],
  total: number
}

interface Item {
  quantity: number;
  price: number;
}

interface OrderDocument extends Document {
  items: Item[];
  total: number;
}

const orderSchema = new mongoose.Schema<IOrder>({
  customerName: {
    type: String,
    required: true
  },
  items: [
    {
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  }
},
  { timestamps: true })

orderSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  this.total = this.items.reduce((sum: number, item: { quantity: number; price: number }) => sum + item.quantity * item.price, 0);
  next()
});

orderSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Partial<OrderDocument>;
  if (update && update.items) {
    const items: Item[] = update.items as Item[];
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    this.setUpdate({ ...update, total });
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;