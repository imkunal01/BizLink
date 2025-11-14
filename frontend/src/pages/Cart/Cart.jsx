import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Cart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
              <CardDescription>
                Items in your cart will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground">
                  Cart functionality will be implemented in Phase 2
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>$0.00</span>
              </div>
              <Button className="w-full" disabled>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Cart Page Status</CardTitle>
            <CardDescription>
              This is a placeholder for the shopping cart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✅ Layout and styling ready</p>
              <p>✅ Responsive grid system implemented</p>
              <p>✅ Cart state management ready (Redux)</p>
              <p>⏳ Cart API integration pending (Phase 2)</p>
              <p>⏳ Product addition to cart pending (Phase 2)</p>
              <p>⏳ Checkout process pending (Phase 2)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cart