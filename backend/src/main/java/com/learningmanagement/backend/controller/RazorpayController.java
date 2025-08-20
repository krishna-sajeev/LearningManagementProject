package com.learningmanagement.backend.controller;

import com.learningmanagement.backend.model.Course;
import com.learningmanagement.backend.repository.CourseRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class RazorpayController {

    @Value("${razorpay.keyId}")
    private String keyId;

    @Value("${razorpay.keySecret}")
    private String keySecret;

    @Value("${razorpay.webhookSecret:}")
    private String webhookSecret;

    @Autowired
    CourseRepository courseRepo;
    /**
     * Step 1: Create Razorpay Order
     */
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, String> body, Principal principal) {
        try {
            // Normally lookup course price from DB (hardcoding here for demo)
            String userId = principal != null ? principal.getName() : "guest";
            String courseId = body.get("courseId");
            Course course = courseRepo.findByCourseId(courseId);
            long amountInRupees = (long) course.getFee(); // Example ₹499
            long amountInPaise = amountInRupees * 100;

            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            JSONObject options = new JSONObject();
            options.put("amount", amountInPaise);
            options.put("currency", "INR");
            options.put("receipt", "lms_" + userId + "_" + courseId + "_" + System.currentTimeMillis());

            JSONObject notes = new JSONObject();
            notes.put("userId", userId);
            notes.put("courseId", courseId);
            options.put("notes", notes);

            Order order = client.orders.create(options);



            Map<String, Object> resp = new HashMap<>();
            resp.put("orderId", order.get("id"));
            resp.put("amount", order.get("amount"));
            resp.put("currency", order.get("currency"));
            resp.put("key", keyId); // safe to send to frontend
            return ResponseEntity.ok(resp);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }



    /**
     * Step 2: Verify Payment Signature (after frontend checkout success)
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> payload) {
        try {
            String orderId = payload.get("razorpay_order_id");
            String paymentId = payload.get("razorpay_payment_id");
            String signature = payload.get("razorpay_signature");

            JSONObject data = new JSONObject();
            data.put("razorpay_order_id", orderId);
            data.put("razorpay_payment_id", paymentId);
            data.put("razorpay_signature", signature);

            // Throws Exception if signature invalid
            Utils.verifyPaymentSignature(data, keySecret);

            // ✅ Mark order as successful in DB (not shown here)
            return ResponseEntity.ok(Map.of("status", "verified"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("status", "invalid", "message", e.getMessage()));
        }
    }

    /**
     * Step 3: Optional Webhook (Razorpay -> Backend notifications)
     */
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload,
                                                @RequestHeader("X-Razorpay-Signature") String signature) {
        try {
            Utils.verifyWebhookSignature(payload, signature, webhookSecret);
            // parse payload JSON and update DB
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("invalid");
        }
    }
}

