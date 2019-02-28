package bs.inc.doublehelix;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Menu;
import android.widget.Toast;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
import com.aurelhubert.ahbottomnavigation.notification.AHNotification;

import java.util.ArrayList;
import java.util.stream.Stream;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

public class MainActivity extends AppCompatActivity {
    AHBottomNavigation bottomNavigation;
    private ArrayList<AHBottomNavigationItem> bottomNavigationItems = new ArrayList<>();
    private int[] tabColors;
    private Menu menu;
    private Toolbar mToolbar;
    private static final int TIME_INTERVAL = 2000; // # milliseconds, desired time passed between two back presses.

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Make streaming
        Fragment fr = new StreamFragment();
        Bundle ar = new Bundle();
        ar.putString("url", "http://google.com");
        fr.setArguments(ar);
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.container1, fr,"stream");
        fragmentTransaction.commit();

        AHBottomNavigation bottomNavigation = (AHBottomNavigation) findViewById(R.id.bottom_navigation);

        AHBottomNavigationItem item1 = new AHBottomNavigationItem("Vitals", R.drawable.ic_heart_24dp, R.color.colorBlack);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem("Wishes", R.drawable.ic_cake_black_24dp, R.color.colorBlack);
        AHBottomNavigationItem item3 = new AHBottomNavigationItem("Doctor notes", R.drawable.ic_assignment_black_24dp, R.color.colorBlack);

        bottomNavigation.addItem(item1);
        bottomNavigation.addItem(item2);
        bottomNavigation.addItem(item3);

        bottomNavigation.setDefaultBackgroundColor(Color.parseColor("#FF0000"));

        bottomNavigation.setBehaviorTranslationEnabled(false);

//        bottomNavigation.setAccentColor(Color.parseColor("#F63D2B"));
//        bottomNavigation.setInactiveColor(Color.parseColor("#3f741e"));

        //bottomNavigation.setForceTint(true);

//        bottomNavigation.setTranslucentNavigationEnabled(true);

        bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);

        bottomNavigation.setColored(true);

        bottomNavigation.setCurrentItem(0);


        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                Toast.makeText(MainActivity.this,String.valueOf(position),Toast.LENGTH_SHORT).show();
                switch (position){
                    case 1:
                        startActivity(new Intent(MainActivity.this, LoginActivity.class));
                        break;
                    case 0: break;
                    case 2: break;
                }
                return true;
            }
        });
    }
}