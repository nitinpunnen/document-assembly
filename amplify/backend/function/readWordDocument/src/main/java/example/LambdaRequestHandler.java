package example;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3ObjectLambdaEvent;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.WriteGetObjectResponseRequest;

import java.net.URL;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
public class LambdaRequestHandler implements RequestHandler<List<String>, ResponseClass> {

    @Override
    public ResponseClass handleRequest(List<String> input, Context context) {
        AmazonS3 s3Client = AmazonS3Client.builder().build();
        // Set the presigned URL to expire after one hour.
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = Instant.now().toEpochMilli();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        List<URL> urls = new ArrayList<URL>();

        // Generate the presigned URL.
        System.out.println("Generating pre-signed URL.");
        for (String objectKey: input) {
            System.out.println(objectKey);
            GeneratePresignedUrlRequest generatePresignedUrlRequest =
                    new GeneratePresignedUrlRequest("documentassembly-gama-landingzone203749-dev", objectKey)
                            .withMethod(HttpMethod.GET)
                            .withExpiration(expiration);
            URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);
            System.out.println(url.toString());
            urls.add(url);
        }
        return new ResponseClass(urls);
    }
}