package cn.org.uyou.llm

import android.content.res.Configuration
import android.os.Bundle
import android.view.View
import android.view.Window
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

fun setBar(window: Window, statusColor: Int, naviColor: Int) {
    window.statusBarColor = statusColor

    window.navigationBarColor = naviColor
}

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Allow content to extend under the system bars
        WindowCompat.setDecorFitsSystemWindows(window, false)
  
        // Get the insets controller to manage system UI
        val windowInsetsController = WindowCompat.getInsetsController(window, window.decorView)
  
  
        // Ensure the status bar is fully transparent
        window.statusBarColor = android.graphics.Color.TRANSPARENT
        window.navigationBarColor = android.graphics.Color.TRANSPARENT
      
//        setBar(window, getColor(R.color.status_bar_color), getColor(R.color.navigation_bar_color))
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
      
        val dark = this.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK == Configuration.UI_MODE_NIGHT_YES
      
//        setBar(window, getColor(R.color.status_bar_color), getColor(R.color.navigation_bar_color))
        
        if (dark) {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE)
        } else {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR) 
        }
    }
}