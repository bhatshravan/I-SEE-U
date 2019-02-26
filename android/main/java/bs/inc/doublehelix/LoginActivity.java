package bs.inc.doublehelix;

import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    Button login;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);

        login = findViewById(R.id.login_btn);



        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                TextView email= findViewById(R.id.userid);
                TextView pass = findViewById(R.id.password);

                String em = email.getText().toString().trim();
                String password = pass.getText().toString();

                startActivity(new Intent(LoginActivity.this,MainActivity.class));
            }
        });
    }
}