package bs.inc.doublehelix;

import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;


public class LoginActivity extends AppCompatActivity {

    Button login;

    String loginURL="https://localhost:8080/Login/Test";

    RequestQueue requestQueue;
    private GridLayoutManager lLayout;


    JSONObject jsonObject;
    JSONArray ja;
    JsonObjectRequest jor;
    String v="",url="";
    String msg;

    JSONObject jsonBody = new JSONObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        Button lgnbtn = findViewById(R.id.login_btn);

        lgnbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                TextView email= findViewById(R.id.userid);
                TextView pass = findViewById(R.id.password);

                String em = email.getText().toString().trim();
                String password = pass.getText().toString();

                sendPost2();
                //getLogin();
                // startActivity(new Intent(LoginActivity.this,MainActivity.class));
            }
        });
    }

    String em,password;

    void sendPost2(){
        TextView email= findViewById(R.id.userid);
        TextView pass = findViewById(R.id.password);

        em = email.getText().toString().trim();
        password = pass.getText().toString();

        requestQueue = Volley.newRequestQueue(LoginActivity.this);
        final String URL = "http://192.168.0.107:8080/Login/Test";

        HashMap<String, String> params = new HashMap<String, String>();

        params.put("password", password);
        params.put("user", em);

        JsonObjectRequest request_json = new JsonObjectRequest(URL, new JSONObject(params),
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            //Process os success response
                            Log.i("TAG", response.toString());
                            Toast.makeText(LoginActivity.this,response.toString(),Toast.LENGTH_SHORT).show();
                            String user = response.getString("user");
                            String type = em;


                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                NetworkResponse response = error.networkResponse;
                if(response != null && response.data != null){
                    switch(response.statusCode){
                        case 400:
                            v="There was an error connecting to our servers.Please check your connection and refresh.";
                            break;
                        case 500:
                        case 501:
                        case 502:
                        case 503:
                        case 504:
                        case 505:
                            v="There was an error in our servers,please reload the page.\nSorry for the inconvienence";
                            break;
                    }
                    //Additional cases
                }
                VolleyLog.e("Error: ", error.getMessage());
                Toast.makeText(LoginActivity.this,"Could not resolve url:\nError"+v,Toast.LENGTH_SHORT).show();
            }
        });

        request_json.setShouldCache(false);
        requestQueue.add(request_json);
    }


    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService( Activity.CONNECTIVITY_SERVICE );
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
}