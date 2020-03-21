import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Link = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="whatsapp://send?text=❗ATUALIZAÇÃO ❗ %0D%0A %0D%0A A Associação Brasileira de Enfermeiros de Centro Cirúrgico (Sobecc) publicou algumas recomendações sobre o atendimento de pacientes com suspeita ou infecção confirmada pelo Covid-19 em procedimentos cirúrgicos ou endoscópicos. %0D%0A %0D%0A O material tem como objetivo garantir a segurança e a instrumentalização dos profissionais que atuam nessa área de assistência. %0D%0A %0D%0A Entre as recomendações, destacam-se: %0D%0A - proteção da equipe; %0D%0A - organização do atendimento; %0D%0A - preparo da sala de procedimento; %0D%0A - transporte do paciente cirúrgico intraoperatório %0D%0A - realização do procedimento endoscópio e pós-operatório ou pós-procedimento endoscópio imediato. %0D%0A %0D%0A para saber mais acesse : %0D%0A https://monitorcovid19.github.io/"
  >
    <ShareIcon />
  </a>
);

const InfoCard = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div key={props.id} className="protocolCard">
      <Card className={classes.root}>
        <CardHeader
          action={
            <span style={{ cursor: "not-allowed" }}>
              <IconButton component={Link} aria-label="share"></IconButton>
            </span>
          }
          title={props.data.title}
          subheader={new Date(props.data.date.seconds * 1000).toLocaleString(
            "pt-BR"
          )}
        />
        <CardMedia
          className={classes.media}
          image={props.data.image}
          title={props.data.target}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* We will have to find a way to parse this text to html, we could check: https://github.com/milesj/interweave */}
            <Typography paragraph>{props.data.text}</Typography>
            <Typography paragraph>
              <a
                href={props.data.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                Veja a Fonte
              </a>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
export default InfoCard;
