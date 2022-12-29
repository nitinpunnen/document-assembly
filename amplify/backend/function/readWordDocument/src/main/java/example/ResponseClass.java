

package example;

import java.net.URL;
import java.util.List;

public class ResponseClass {
    public List<URL> getUrls() {
        return urls;
    }

    public void setUrls(List<URL> urls) {
        this.urls = urls;
    }

    List<URL> urls;

    public ResponseClass(List<URL> urls) {
        this.urls = urls;
    }
}