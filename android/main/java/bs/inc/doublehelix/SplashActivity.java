package bs.inc.doublehelix;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.daimajia.androidanimations.library.Techniques;
import com.daimajia.androidanimations.library.YoYo;

import androidx.appcompat.app.AppCompatActivity;

//

public class SplashActivity extends AppCompatActivity {


    private static int SPLASH_TIME_OUT = 500;
    private LinearLayout splashLinearLayout;
    private ImageView splashImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_splash);

        initialiseViews();
    }
    private void initialiseViews() {


        splashImage = findViewById(R.id.splashimageView);

        YoYo.with(Techniques.BounceIn)
                .duration(1000)
                .repeat(1)
                .playOn(findViewById(R.id.splashimageView));

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent i = new Intent(SplashActivity.this, MainActivity.class);
                startActivity(i);
                finish();
            }
        }, SPLASH_TIME_OUT);


    }
}
