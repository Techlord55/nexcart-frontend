export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-8">Returns & Exchanges</h1>
      <div className="prose max-w-none">
        <h2>30-Day Return Policy</h2>
        <p>We offer a 30-day return policy on most items.</p>
        
        <h2>How to Return</h2>
        <ol>
          <li>Contact our support team</li>
          <li>Receive a return authorization</li>
          <li>Ship the item back to us</li>
          <li>Receive your refund within 5-7 business days</li>
        </ol>

        <h2>Conditions</h2>
        <ul>
          <li>Items must be unused and in original packaging</li>
          <li>Keep your receipt or proof of purchase</li>
          <li>Some items are not eligible for return</li>
        </ul>
      </div>
    </div>
  )
}