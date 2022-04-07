<StyledStaticButton active={true} color={"primary"} onClick={handleClick}>
{"Miscellaneous / Handouts"}
</StyledStaticButton>


<MenuItem onClick={handleClose}>Resume 1</MenuItem>
           <MenuItem onClick={handleClose}>Resume 2</MenuItem>
           <MenuItem onClick={handleClose}>Resume 3</MenuItem>

           import {
            customTheme,
            StyledStaticButton,
           
          } from "../../Asset/StyledComponents/Styles";




          <Grid item xs={12}>
              <Tabs
                TabIndicatorProps={{
                  style: {
                    width: "10%",

                    marginLeft: "2%",
                  },
                }}
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
                aria-label='simple tabs example'
              >
                <Tab label='Graduate School 1' />
                <Tab label='Graduate School 2' />
                <Tab label='Graduate School 3' />
              </Tabs>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography>
                  <br />
                  &nbsp;&nbsp;Program Link:<a href='#'>Program Link</a>
                  &nbsp;&nbsp;&nbsp;Deadline:<a href='#'>Deadline</a>
                </Typography>
              </Grid>

              stageBoxLayoutStyle